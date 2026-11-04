# /// script
# requires-python = ">=3.12"
# dependencies = ["matplotlib>=3.9,<4"]
# ///
"""Reproduce the scaling blog's analytical FLOPs figure.

Run: uv run scripts/plot_training_flops.py
Convention: multiply-add = 2 FLOPs; forward + both input/weight gradients.
Dense Transformer body only, standard MHA, two-layer MLP with expansion 4.
Exclude embedding/head, pointwise ops, optimizer, and all recomputation.
The causal curve counts only s(s+1)/2 valid pairs; it is not a kernel profile.
See PaLM Appendix B: https://arxiv.org/html/2204.02311v5#A2
"""

import json
from pathlib import Path

import matplotlib

matplotlib.use("Agg")
import matplotlib.pyplot as plt
import numpy as np


LAYERS = 12
WIDTH = 1024
TOKENS = 1_000_000_000
PARAMETERS = 12 * LAYERS * WIDTH**2
BASELINE = 6 * PARAMETERS * TOKENS
OUT = Path(__file__).resolve().parents[1] / "public/blogs/scaling/assets"


def count_from_operations(sequence_length, causal=False):
    """Count the individual forward matmuls, then their two backward matmuls."""
    s, d = sequence_length, WIDTH
    shapes = [(s, d, 3 * d), (s, d, d), (s, d, 4 * d), (s, 4 * d, d)]
    projection_forward = sum(2 * m * k * n for m, k, n in shapes)
    pairs = s * (s + 1) / 2 if causal else s * s
    attention_forward = 2 * pairs * d + 2 * pairs * d  # QK^T and AV
    return 3 * (projection_forward + attention_forward) * LAYERS * TOKENS / s


def count_from_formula(sequence_length, causal=False):
    attention = (6 * (sequence_length + 1) if causal else 12 * sequence_length)
    return BASELINE + attention * LAYERS * WIDTH * TOKENS


for length in (1, 1024, 8192, 32768):
    for causal in (False, True):
        assert count_from_operations(length, causal) == count_from_formula(length, causal)
assert np.isclose(count_from_formula(8192) / BASELINE, 7 / 3)
assert np.isclose(count_from_formula(32768) / BASELINE, 19 / 3)

OUT.mkdir(parents=True, exist_ok=True)
plt.rcParams.update({
    "font.family": "DejaVu Sans", "font.size": 12,
    "axes.spines.top": False, "axes.spines.right": False,
    "axes.edgecolor": "#d4d5d6", "axes.labelcolor": "#42444a",
    "xtick.color": "#62656c", "ytick.color": "#62656c",
    "svg.fonttype": "none", "savefig.facecolor": "white",
})
fig, ax = plt.subplots(figsize=(9, 5.1))
fig.subplots_adjust(left=0.10, right=0.96, bottom=0.17, top=0.85)
fig.text(0.10, 0.94, "12 layers · width 1,024 · 151M body parameters · 1B total training tokens", size=11, color="#71717a")
s = np.linspace(256, 32768, 300)
ax.plot(s / 1024, count_from_formula(s) / 1e18, color="#6c8ba7", lw=2.7,
        label="6ND + attention (full square)")
ax.plot(s / 1024, count_from_formula(s, True) / 1e18, color="#879b88", lw=2.5,
        linestyle=(0, (7, 3)), label="6ND + attention (ideal causal)")
ax.axhline(BASELINE / 1e18, color="#9b8e7f", lw=2.2, linestyle=(0, (2, 3)), label="6ND")
ax.fill_between(s / 1024, BASELINE / 1e18, count_from_formula(s) / 1e18,
                color="#6c8ba7", alpha=0.055)
ax.set(xlim=(0, 33), ylim=(0, 6.7), xlabel="Sequence length (1k = 1,024 tokens)",
       ylabel="Training FLOPs (×10¹⁸)", xticks=[0, 8, 16, 24, 32], yticks=[0, 1, 2, 3, 4, 5, 6])
ax.set_xticklabels(["0", "8k", "16k", "24k", "32k"])
ax.grid(axis="y", color="#eeeff1", lw=0.8)
ax.set_axisbelow(True)
ax.legend(loc="upper left", frameon=False, fontsize=10.5, handlelength=2.8)
for value, color, label in [
    (count_from_formula(32768), "#6c8ba7", "6.33×"),
    (count_from_formula(32768, True), "#879b88", "3.67×"),
    (BASELINE, "#9b8e7f", "1.00×"),
]:
    ax.plot(32, value / 1e18, "o", ms=5, color=color)
    ax.annotate(label, (32, value / 1e18), xytext=(-8, 10), textcoords="offset points",
                ha="right", color=color, size=11, weight="semibold")
fig.text(0.10, 0.035, "Multiples of 6ND shown at 32k.",
         fontsize=10, color="#71717a")
for extension in ("svg", "png"):
    fig.savefig(OUT / f"sequence-length-flops.{extension}", dpi=180)
plt.close(fig)
rows = [{
    "sequence_length": length, "six_nd": BASELINE,
    "with_full_square_attention": count_from_formula(length),
    "with_ideal_causal_attention": count_from_formula(length, True),
} for length in (1024, 2048, 4096, 8192, 16384, 32768)]
(OUT / "sequence-length-flops.json").write_text(json.dumps({
    "layers": LAYERS, "width": WIDTH, "body_parameters": PARAMETERS,
    "total_training_tokens": TOKENS, "rows": rows,
}, indent=2) + "\n")
print(json.dumps(rows, indent=2))
