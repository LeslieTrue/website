export type Link = {
  label: string;
  href: string;
};

export type NewsItem = {
  date: string;
  html: string;
};

export type Publication = {
  title: string;
  href: string;
  authorsHtml: string;
  venueHtml: string;
  links: Link[];
};

export const profile = {
  name: "Tianzhe Chu",
  email: "mailto:tianzhechu@gmail.com",
  resume: "/data/resume_ctz.pdf",
  primaryImage: "/images/me.jpg",
  introHtml: `I'm a 2nd year Ph.D student at HKU IDS advised by Prof. <a href="http://people.eecs.berkeley.edu/~yima/">Yi Ma</a>. Before that, I obtained B.Eng. in Computer Science (Honor) from ShanghaiTech University. I started my research journey at <span class="text-hover-container">Berkeley<span class="text-hover-message">trained to be a cook there</span></span> also with Yi. I am from Suzhou and love to <span class="text-hover-container">season my dishes with sweet<span class="text-hover-message">Opposite cooking philosophy easily gets me pissed :/</span></span>.`,
  links: [
    { label: "Email", href: "mailto:tianzhechu@gmail.com" },
    { label: "Resume", href: "/data/resume_ctz.pdf" },
    {
      label: "Google Scholar",
      href: "https://scholar.google.com/citations?hl=en&user=v6HphBcAAAAJ",
    },
    { label: "Github", href: "https://github.com/LeslieTrue" },
    { label: "Twitter", href: "https://www.twitter.com/TianzheC" },
    { label: "Photos", href: "https://tianzhechu.notion.site/photos" },
  ] satisfies Link[],
};

export const researchHtml = `My research interests broadly lie in discovering scientific clues for foundation models: how data, architectures, and training methods shape their behavior. I probe these questions across mathematical reasoning, new knowledge acquisition, vision and robotics.`;

export const news: NewsItem[] = [
  {
    date: "Dec 2025",
    html: `New blog post on <a href="https://gaussmath.ai/eval.html">eval llm-as-a-judge</a>.`,
  },
  {
    date: "Aug 2025",
    html: `New <a href="https://ma-lab-berkeley.github.io/deep-representation-learning-book/">book</a> and accompanying <a href="https://ma-lab-berkeley.github.io/deep-representation-learning-book/ai_helpers.html">AI helpers</a> are available.`,
  },
  {
    date: "Apr 2025",
    html: `Our paper <a href="https://arxiv.org/abs/2501.17161v1">SFTvsRL</a> was accepted by ICML.`,
  },
  { date: "Fall 2024", html: "I joined HKU IDS." },
  {
    date: "Jan 2024",
    html: `Our paper <a href="https://arxiv.org/abs/2306.05272">CPP</a> was accepted by ICLR 2024.`,
  },
  {
    date: "Nov 2023",
    html: `Our paper <a href="https://arxiv.org/abs/2308.16271">CRATE-Segmentation</a> was accepted as an oral presentation at CPAL 2024 and the NeurIPS 2023 XAI Workshop.`,
  },
  {
    date: "Sep 2023",
    html: `Our paper <a href="https://arxiv.org/abs/2306.01129">CRATE (white-box transformer)</a> was accepted by NeurIPS 2023.`,
  },
  {
    date: "May 2023",
    html: "I completed my visit at Berkeley after taking seven technical courses and contributing to several research projects.",
  },
];

export const selectedProjects: Publication[] = [
  {
    title: "Learning Deep Representations of Data Distributions",
    href: "https://ma-lab-berkeley.github.io/deep-representation-learning-book/",
    authorsHtml: "Ma Lab Berkeley",
    venueHtml: "<em>Open-Source Textbook with AI Tooling</em>",
    links: [
      { label: "book", href: "https://ma-lab-berkeley.github.io/deep-representation-learning-book/" },
      { label: "AI helpers", href: "https://ma-lab-berkeley.github.io/deep-representation-learning-book/ai_helpers.html" },
    ],
  },
  {
    title: "GAUSS Eval: Human-LLM Judge Consistency Analysis",
    href: "https://gaussmath.ai/eval.html",
    authorsHtml:
      "<strong>Tianzhe Chu*</strong>, Jiaxin Zhang*, Zhenyu Liao, Qiuyu Ren, Tahsin Saffat, Zitong Yang, Yi Ma, Yue Zhang*",
    venueHtml: "<em>Blog Post, 2025</em>",
    links: [
      { label: "blog", href: "https://gaussmath.ai/eval.html" },
      { label: "report", href: "https://gaussmath.ai/assets/eval.pdf" },
    ],
  },
  {
    title: "SFT Memorizes, RL Generalizes",
    href: "https://arxiv.org/abs/2501.17161v1",
    authorsHtml: `<strong>Tianzhe Chu*</strong>, <a href="https://yx-s-z.github.io/">Yuexiang Zhai*</a>, <a href="https://jihanyang.github.io/">Jihan Yang</a>, <a href="https://tsb0601.github.io/petertongsb/">Shengbang Tong</a>, <a href="https://www.sainingxie.com/">Saining Xie</a>, <a href="https://webdocs.cs.ualberta.ca/~dale/">Dale Schuurmans</a>, <a href="https://cs.stanford.edu/~quocle/">Quoc V. Le</a>, <a href="https://people.eecs.berkeley.edu/~svlevine/">Sergey Levine</a>, <a href="http://people.eecs.berkeley.edu/~yima/">Yi Ma</a>`,
    venueHtml: "<em>ICML 2025</em>",
    links: [
      { label: "project page", href: "/SFTvsRL/" },
      { label: "code", href: "https://github.com/LeslieTrue/SFTvsRL" },
      { label: "arxiv", href: "https://arxiv.org/abs/2501.17161v1" },
    ],
  },
  {
    title: "White-Box Transformers via Sparse Rate Reduction: Compression Is All There Is?",
    href: "https://arxiv.org/abs/2311.13110",
    authorsHtml: "",
    venueHtml: "<em>JMLR 2024; parts at NeurIPS 2023 and CPAL 2024</em>",
    links: [
      { label: "project page", href: "https://ma-lab-berkeley.github.io/CRATE/" },
      { label: "code", href: "https://github.com/Ma-Lab-Berkeley/CRATE" },
      { label: "arxiv", href: "https://arxiv.org/abs/2311.13110" },
    ],
  },
];

export const publications: Publication[] = [
  {
    title: "SFT Memorizes, RL Generalizes: A Comparative Study of Foundation Model Post-training",
    href: "https://arxiv.org/abs/2501.17161v1",
    authorsHtml: `<strong>Tianzhe Chu*</strong>, <a href="https://yx-s-z.github.io/">Yuexiang Zhai*</a>, <a href="https://jihanyang.github.io/">Jihan Yang</a>, <a href="https://tsb0601.github.io/petertongsb/">Shengbang Tong</a>, <a href="https://www.sainingxie.com/">Saining Xie</a>, <a href="https://webdocs.cs.ualberta.ca/~dale/">Dale Schuurmans</a>, <a href="https://cs.stanford.edu/~quocle/">Quoc V. Le</a>, <a href="https://people.eecs.berkeley.edu/~svlevine/">Sergey Levine</a>, <a href="http://people.eecs.berkeley.edu/~yima/">Yi Ma</a>`,
    venueHtml: "<em>ICML 2025</em>",
    links: [
      { label: "project page", href: "/SFTvsRL/" },
      { label: "code", href: "https://github.com/LeslieTrue/SFTvsRL" },
      { label: "arxiv", href: "https://arxiv.org/abs/2501.17161v1" },
    ],
  },
  {
    title: "White-Box Transformers via Sparse Rate Reduction",
    href: "https://arxiv.org/abs/2306.01129",
    authorsHtml: `<a href="https://yaodongyu.github.io/">Yaodong Yu</a>, <a href="https://sdbuchanan.com/">Sam Buchanan</a>, <a href="https://druvpai.github.io/">Druv Pai</a>, <strong>Tianzhe Chu</strong>, <a href="https://robinwu218.github.io/">Ziyang Wu</a>, <a href="https://tsb0601.github.io/petertongsb/">Shengbang Tong</a>, <a href="https://www.cis.jhu.edu/~haeffele/">Benjamin D. Haeffele</a>, <a href="http://people.eecs.berkeley.edu/~yima/">Yi Ma</a>`,
    venueHtml: "<em>NeurIPS 2023</em>",
    links: [
      { label: "code", href: "https://github.com/Ma-Lab-Berkeley/CRATE" },
      { label: "arxiv", href: "https://arxiv.org/abs/2306.01129" },
    ],
  },
  {
    title: "Seeing from Another Perspective: Evaluating Multi-View Understanding in MLLMs",
    href: "https://arxiv.org/abs/2504.15280",
    authorsHtml: `<a href="https://danielchyeh.github.io/">Chun-Hsiao Yeh*</a>, <a href="https://scholar.google.com/citations?hl=en&user=ZkCLeicAAAAJ">Chenyu Wang*</a>, <a href="https://tsb0601.github.io/petertongsb/">Shengbang Tong</a>, <a href="https://ttchengab.github.io/">Ta-Ying Cheng</a>, <a href="https://scholar.google.com/citations?user=V5H0P28AAAAJ">Ruoyu Wang</a>, <strong>Tianzhe Chu</strong>, <a href="https://yx-s-z.github.io/">Yuexiang Zhai</a>, <a href="https://yubeichen.com/">Yubei Chen</a>, <a href="https://scholar.google.com.sg/citations?user=fe-1v0MAAAAJ">Shenghua Gao</a>, <a href="http://people.eecs.berkeley.edu/~yima/">Yi Ma</a>`,
    venueHtml: "<em>AAAI 2026</em>",
    links: [
      { label: "project page", href: "https://danielchyeh.github.io/All-Angles-Bench/" },
      { label: "bench", href: "https://huggingface.co/datasets/ch-chenyu/All-Angles-Bench" },
      { label: "arxiv", href: "https://arxiv.org/abs/2504.152801" },
    ],
  },
  {
    title: "Emergence of Segmentation with Minimalistic White-Box Transformers",
    href: "https://arxiv.org/abs/2308.16271",
    authorsHtml: `<a href="https://yaodongyu.github.io/">Yaodong Yu*</a>, <strong>Tianzhe Chu*</strong>, <a href="https://tsb0601.github.io/petertongsb/">Shengbang Tong</a>, <a href="https://robinwu218.github.io/">Ziyang Wu</a>, <a href="https://druvpai.github.io/">Druv Pai</a>, <a href="https://sdbuchanan.com/">Sam Buchanan</a>, <a href="http://people.eecs.berkeley.edu/~yima/">Yi Ma</a>`,
    venueHtml: "<em>Accepted by CPAL 2024(Oral), NeurIPS 2023 XAI Workshop(Oral)(4 out of 59 accepted papers)</em>",
    links: [
      { label: "demo", href: "https://colab.research.google.com/drive/1rYn_NlepyW7Fu5LDliyBDmFZylHco7ss?usp=sharing" },
      { label: "project page", href: "https://ma-lab-berkeley.github.io/CRATE/" },
      { label: "code", href: "https://github.com/Ma-Lab-Berkeley/CRATE" },
      { label: "arxiv", href: "https://arxiv.org/abs/2308.16271" },
    ],
  },
  {
    title: "White-Box Transformers via Sparse Rate Reduction: Compression Is All There Is?",
    href: "https://arxiv.org/abs/2311.13110",
    authorsHtml: `<a href="https://yaodongyu.github.io/">Yaodong Yu</a>, <a href="https://sdbuchanan.com/">Sam Buchanan</a>, <a href="https://druvpai.github.io/">Druv Pai</a>, <strong>Tianzhe Chu</strong>, <a href="https://robinwu218.github.io/">Ziyang Wu</a>, <a href="https://tsb0601.github.io/petertongsb/">Shengbang Tong</a>, <a href="https://www.jackgethome.com/">Hao Bai</a>, <a href="https://yx-s-z.github.io/">Yuexiang Zhai</a>, <a href="https://www.cis.jhu.edu/~haeffele/">Benjamin D. Haeffele</a>, <a href="http://people.eecs.berkeley.edu/~yima/">Yi Ma</a>`,
    venueHtml: "<em>JMLR 2024</em>",
    links: [
      { label: "project page", href: "https://ma-lab-berkeley.github.io/CRATE/" },
      { label: "code", href: "https://github.com/Ma-Lab-Berkeley/CRATE" },
      { label: "arxiv", href: "https://arxiv.org/abs/2311.13110" },
    ],
  },
  {
    title: "Image Clustering via the Principle of Rate Reduction in the Age of Pretrained Models",
    href: "https://arxiv.org/abs/2306.05272",
    authorsHtml: `<strong>Tianzhe Chu*</strong>, <a href="https://tsb0601.github.io/petertongsb/">Shengbang Tong*</a>, <a href="https://tianjiaoding.com/">Tianjiao Ding*</a>, <a href="https://delay-xili.github.io/">Xili Dai</a>, <a href="https://www.cis.jhu.edu/~haeffele/">Benjamin D. Haeffele</a>, <a href="http://vision.jhu.edu/rvidal.html">René Vidal</a>, <a href="http://people.eecs.berkeley.edu/~yima/">Yi Ma</a>`,
    venueHtml: "<em>Accepted by ICLR 2024</em>",
    links: [
      { label: "code", href: "https://github.com/LeslieTrue/CPP" },
      { label: "arxiv", href: "https://arxiv.org/abs/2306.05272" },
    ],
  },
  {
    title: "GenDexHand: Generative Simulation for Dexterous Hands",
    href: "https://arxiv.org/abs/2511.01791",
    authorsHtml: "Feng Chen, Zhuxiu Xu, <strong>Tianzhe Chu</strong>, Xunzhe Zhou, Li Sun, Zewen Wu, Shenghua Gao, Zhongyu Li, Yanchao Yang, Yi Ma",
    venueHtml: "<em>Preprint, 2025</em>",
    links: [
      { label: "project page", href: "https://winniechen2002.github.io/GenDexHand/" },
      { label: "arxiv", href: "https://arxiv.org/abs/2511.01791" },
    ],
  },
  {
    title: "Pointer-CAD: Unifying B-Rep and Command Sequences via Pointer-based Edges & Faces Selection",
    href: "https://arxiv.org/abs/2603.04337",
    authorsHtml: "Dacheng Qi, Chenyu Wang, Jingwei Xu, <strong>Tianzhe Chu</strong>, Zibo Zhao, Wen Liu, Wenrui Ding, Yi Ma, Shenghua Gao",
    venueHtml: "<em>CVPR 2026</em>",
    links: [{ label: "arxiv", href: "https://arxiv.org/abs/2603.04337" }],
  },
  {
    title: "GAUSS Eval: Human-LLM Judge Consistency Analysis",
    href: "https://gaussmath.ai/eval.html",
    authorsHtml:
      "<strong>Tianzhe Chu*</strong>, Jiaxin Zhang*, Zhenyu Liao, Qiuyu Ren, Tahsin Saffat, Zitong Yang, Yi Ma, Yue Zhang*",
    venueHtml: "<em>Blog Post, 2025</em>",
    links: [
      { label: "blog", href: "https://gaussmath.ai/eval.html" },
      { label: "report", href: "https://gaussmath.ai/assets/eval.pdf" },
    ],
  },
];

export const serviceItems = [
  "Head TA: DATA8014 Deep Representation Learning (2025 Fall)",
  "Reviewer: ICLR 2025/2026, ICML 2025, NeurIPS 2025",
  "Co-organizing: Lap-Chee Hiking Club, ALICE Seminar",
];

export const miscHtml = [
  `I occasionally share photos <a href="https://tianzhechu.notion.site/photos">here</a>.`,
];
