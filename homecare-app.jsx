import { useState } from "react";
import {
  Search, Home, BookOpen, HelpCircle, ChevronRight, ArrowLeft,
  Heart, Droplets, Utensils, Moon, Activity, Wind, Phone,
  Star, Clock, CheckCircle, X, ChevronDown
} from "lucide-react";

// ── Data ──────────────────────────────────────────────────────────────────────

const CATEGORIES = [
  { id: "bedsore",  icon: Heart,    label: "床ずれ予防",  color: "bg-rose-50   text-rose-400",   ring: "ring-rose-200" },
  { id: "food",     icon: Utensils, label: "食事・栄養",  color: "bg-amber-50  text-amber-400",  ring: "ring-amber-200" },
  { id: "hygiene",  icon: Droplets, label: "清潔ケア",    color: "bg-sky-50    text-sky-400",    ring: "ring-sky-200" },
  { id: "sleep",    icon: Moon,     label: "睡眠・休息",  color: "bg-violet-50 text-violet-400", ring: "ring-violet-200" },
  { id: "vital",    icon: Activity, label: "バイタル管理", color: "bg-teal-50   text-teal-400",   ring: "ring-teal-200" },
  { id: "breath",   icon: Wind,     label: "呼吸ケア",    color: "bg-cyan-50   text-cyan-400",   ring: "ring-cyan-200" },
];

const ARTICLES = [
  {
    id: 1, category: "bedsore",
    tag: "床ずれ予防",
    title: "体位交換の基本：2時間ごとの正しいやり方",
    summary: "長時間同じ体勢でいると、皮膚への圧迫が続き床ずれの原因になります。2時間ごとの体位変換で予防しましょう。",
    readTime: "4分",
    points: [
      "2時間おきに体の向きを変える（仰向け→右向き→仰向け→左向きを繰り返す）",
      "クッションや体位変換枕で骨の出っ張り部分（仙骨・かかと・肩甲骨）を浮かせる",
      "皮膚の赤みや熱感が続くときは圧迫が強いサイン。すぐにポジションを変える",
      "栄養と水分補給も大切。皮膚の回復力を高めます",
    ],
    note: "すでに赤みが治まらない場合は看護師にご相談ください。",
  },
  {
    id: 2, category: "food",
    tag: "食事・栄養",
    title: "誤嚥を防ぐ食事の工夫：とろみのつけ方と姿勢",
    summary: "飲み込む力が弱くなると誤嚥（食べ物が気管に入る）のリスクが高まります。適切なとろみと姿勢で安全に食事を楽しみましょう。",
    readTime: "5分",
    points: [
      "食事前に口の体操（「パ・タ・カ・ラ」を5回ずつ）で飲み込む準備をする",
      "とろみ剤は「コップ1杯（200ml）に対して小さじ1〜2杯」が目安。製品の指示を確認",
      "食事中は30〜45度ベッドを起こし、顎を少し引いた姿勢に（頸部前屈位）",
      "食後30分は横にならず座位を保つことで逆流・誤嚥を予防",
    ],
    note: "食事中にむせが頻繁な場合は訪問時に看護師へお伝えください。",
  },
  {
    id: 3, category: "hygiene",
    tag: "清潔ケア",
    title: "清拭（せいしき）の手順：お風呂に入れない日の体拭き",
    summary: "体調不良や入浴が難しい日でも清潔を保つことが大切です。蒸しタオルを使った清拭の正しい手順をご紹介します。",
    readTime: "6分",
    points: [
      "室温は22〜24℃に調整し、窓や扉を閉めて寒くならないようにする",
      "タオルはお湯（40℃前後）でしっかり絞り、体温より少し高めが気持ちよい",
      "拭く順番：顔→首→胸・お腹→腕→背中→脚→陰部の順。陰部は専用タオルを使用",
      "皮膚の赤み・ただれ・傷がないか確認しながら進める",
    ],
    note: "皮膚トラブルを見つけたら、拭き取りを中断し看護師に連絡を。",
  },
  {
    id: 4, category: "vital",
    tag: "バイタル管理",
    title: "血圧・体温・SpO2の「気になる数値」の目安",
    summary: "毎日記録しているバイタル、どの数値になったら連絡すればいいか分からないというご家族が多くいます。目安をまとめました。",
    readTime: "3分",
    points: [
      "血圧：最高血圧180mmHg以上 または 90mmHg以下 は要注意",
      "体温：37.5℃以上の発熱、または35℃以下の低体温は連絡を",
      "SpO2（酸素飽和度）：94%以下が続く場合はすぐに相談を",
      "いつもと様子が違う（ぼんやりしている・顔色が悪い）ときも迷わず連絡OK",
    ],
    note: "数値が正常でも「なんかおかしい」と感じたら遠慮なくご連絡ください。",
  },
  {
    id: 5, category: "sleep",
    tag: "睡眠・休息",
    title: "夜間に目が覚めてしまう原因と対処法",
    summary: "夜中に何度も起きてしまう「中途覚醒」。介護される方にも介護する方にも影響します。よくある原因と対策をまとめました。",
    readTime: "4分",
    points: [
      "痛みや不快感：床ずれ・尿意・冷えがないか確認する",
      "昼寝が長すぎる：昼寝は30分以内、15時以降はしない",
      "夕方以降のカフェイン（お茶・コーヒー）を控える",
      "夜間の照明は赤みがかった間接照明（LEDの電球色）が睡眠を妨げにくい",
    ],
    note: "痛みや呼吸の問題が疑われる場合は看護師にご相談を。",
  },
  {
    id: 6, category: "breath",
    tag: "呼吸ケア",
    title: "息苦しそうなとき家族ができること",
    summary: "「呼吸が速い」「胸が苦しそう」と感じたとき、慌てずにできる対応を知っておきましょう。",
    readTime: "3分",
    points: [
      "まず落ち着かせる。「大丈夫ですよ」と声をかけながら手を握る",
      "上半身を起こす（ファウラー位）：ベッドを30〜45度挙上、前かがみに近い姿勢で楽になることが多い",
      "窓を少し開けて新鮮な空気を入れる（冬は冷やしすぎに注意）",
      "唇が紫色になる・意識がない・SpO2が90%以下 → ただちに119番",
    ],
    note: "在宅酸素を使用中の方は機器の設定を勝手に変えず看護師に連絡を。",
  },
];

const FAQS = [
  { q: "訪問看護を利用するには何が必要ですか？", a: "医師の「訪問看護指示書」と、介護保険または医療保険の申請が必要です。まずは主治医やケアマネジャーにご相談ください。当ステーションでもご案内できます。" },
  { q: "夜中に急に具合が悪くなったらどうすればいいですか？", a: "当ステーションでは24時間対応の緊急連絡窓口を設けています。まずお電話ください。状況によって緊急訪問や救急への連絡をご案内します。" },
  { q: "床ずれができてしまいました。自宅でどう対応しますか？", a: "まず傷口を清潔に保ち、圧迫を避けてください。自己判断での処置は悪化させることがあるため、できるだけ早く看護師にご連絡ください。" },
  { q: "食事を全然食べてくれません。どうすればいいですか？", a: "食欲低下の原因は様々です（口内炎・便秘・薬の副作用など）。無理に食べさせようとせず、まずは好みのものを少量ずつ試してみてください。体重が著しく落ちるようであればご相談ください。" },
  { q: "介護で自分が疲れてしまっています。相談できますか？", a: "もちろんです。介護者ご自身のつらさも大切なケアの対象です。レスパイト（短期入所）や訪問の調整なども一緒に考えます。遠慮なくお話ください。" },
  { q: "薬を飲んでくれません。どう対応すればいいですか？", a: "薬の形状や味の問題、飲み込みにくさが原因のことがあります。薬の粉砕やゼリー服用などに変更できる場合もありますので、訪問時や電話でご相談ください。" },
  { q: "退院してから初めて在宅療養です。何を準備すればいいですか？", a: "退院前に病院のソーシャルワーカーや退院支援看護師と連携し、必要な医療機器・介護用品・サービスを準備します。退院前カンファレンスにも同席できますのでご連絡ください。" },
];

// ── Sub-components ────────────────────────────────────────────────────────────

function BottomNav({ screen, setScreen }) {
  const items = [
    { id: "home", icon: Home, label: "ホーム" },
    { id: "articles", icon: BookOpen, label: "記事一覧" },
    { id: "faq", icon: HelpCircle, label: "FAQ" },
  ];
  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-sm bg-white border-t border-slate-100 flex z-30">
      {items.map(({ id, icon: Icon, label }) => (
        <button
          key={id}
          onClick={() => setScreen(id)}
          className={`flex-1 flex flex-col items-center gap-0.5 py-3 text-xs font-medium transition-colors
            ${screen === id ? "text-teal-500" : "text-slate-400 hover:text-teal-400"}`}
        >
          <Icon size={20} strokeWidth={screen === id ? 2.5 : 1.8} />
          {label}
        </button>
      ))}
    </nav>
  );
}

function ArticleCard({ article, onClick }) {
  const cat = CATEGORIES.find(c => c.id === article.category);
  return (
    <button
      onClick={onClick}
      className="w-full text-left bg-white rounded-2xl shadow-sm border border-slate-100 p-4 hover:shadow-md active:scale-[.98] transition-all duration-150"
    >
      <div className="flex items-center gap-2 mb-2">
        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${cat.color} ring-1 ${cat.ring}`}>
          {article.tag}
        </span>
        <span className="text-xs text-slate-400 flex items-center gap-1"><Clock size={11} /> {article.readTime}</span>
      </div>
      <p className="text-sm font-semibold text-slate-700 leading-snug mb-1">{article.title}</p>
      <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">{article.summary}</p>
      <div className="flex items-center justify-end mt-2 text-teal-400 text-xs font-medium gap-0.5">
        続きを読む <ChevronRight size={13} />
      </div>
    </button>
  );
}

// ── Screens ───────────────────────────────────────────────────────────────────

function HomeScreen({ setScreen, setArticle }) {
  return (
    <div className="pb-24 px-4">
      {/* Hero */}
      <div className="relative -mx-4 mb-6 overflow-hidden">
        <div className="bg-gradient-to-br from-teal-400 via-cyan-400 to-sky-300 px-6 pt-12 pb-10">
          {/* decorative circles */}
          <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-10 translate-x-10" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-6 -translate-x-6" />
          <p className="text-white/80 text-xs font-medium tracking-widest uppercase mb-1">訪問看護ステーション</p>
          <h1 className="text-white text-2xl font-bold leading-tight mb-1">在宅ケア<br/>ノウハウガイド</h1>
          <p className="text-white/75 text-xs leading-relaxed">ご家族の不安に寄り添う、<br/>正しいケア情報をお届けします。</p>
        </div>
      </div>

      <>
        {/* Categories */}
          <section className="mb-6">
            <h2 className="text-sm font-bold text-slate-600 mb-3">症状・悩みから探す</h2>
            <div className="grid grid-cols-3 gap-2.5">
              {CATEGORIES.map(({ id, icon: Icon, label, color, ring }) => (
                <button
                  key={id}
                  onClick={() => { setScreen("articles"); }}
                  className={`flex flex-col items-center gap-1.5 py-3.5 rounded-2xl ${color} ring-1 ${ring} active:scale-95 transition-transform`}
                >
                  <Icon size={22} strokeWidth={1.7} />
                  <span className="text-xs font-semibold leading-tight text-center">{label}</span>
                </button>
              ))}
            </div>
          </section>

          {/* Latest articles */}
          <section>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-bold text-slate-600">最新のケア記事</h2>
              <button onClick={() => setScreen("articles")} className="text-xs text-teal-500 flex items-center gap-0.5">
                すべて見る <ChevronRight size={12} />
              </button>
            </div>
            <div className="flex flex-col gap-3">
              {ARTICLES.slice(0, 4).map(a => (
                <ArticleCard key={a.id} article={a} onClick={() => { setArticle(a); setScreen("article"); }} />
              ))}
            </div>
          </section>
      </>
    </div>
  );
}

function ArticlesScreen({ setScreen, setArticle }) {
  const [activeCategory, setActiveCategory] = useState("all");
  const filtered = activeCategory === "all"
    ? ARTICLES
    : ARTICLES.filter(a => a.category === activeCategory);

  return (
    <div className="pb-24">
      {/* Header */}
      <div className="sticky top-0 z-20 bg-white border-b border-slate-100 px-4 pt-4 pb-2">
        <h2 className="text-base font-bold text-slate-700 mb-3">ケア記事一覧</h2>
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none -mx-1 px-1">
          <button
            onClick={() => setActiveCategory("all")}
            className={`shrink-0 text-xs font-semibold px-3.5 py-1.5 rounded-full border transition-colors
              ${activeCategory === "all" ? "bg-teal-500 text-white border-teal-500" : "bg-white text-slate-500 border-slate-200"}`}
          >すべて</button>
          {CATEGORIES.map(c => (
            <button
              key={c.id}
              onClick={() => setActiveCategory(c.id)}
              className={`shrink-0 text-xs font-semibold px-3.5 py-1.5 rounded-full border transition-colors
                ${activeCategory === c.id ? "bg-teal-500 text-white border-teal-500" : "bg-white text-slate-500 border-slate-200"}`}
            >{c.label}</button>
          ))}
        </div>
      </div>

      <div className="px-4 pt-4 flex flex-col gap-3">
        {filtered.map(a => (
          <ArticleCard key={a.id} article={a} onClick={() => { setArticle(a); setScreen("article"); }} />
        ))}
      </div>
    </div>
  );
}

function ArticleScreen({ article, setScreen }) {
  const cat = CATEGORIES.find(c => c.id === article.category);
  const Icon = cat.icon;
  return (
    <div className="pb-28">
      {/* Back */}
      <div className="sticky top-0 z-20 bg-white/90 backdrop-blur border-b border-slate-100 px-4 py-3 flex items-center gap-2">
        <button onClick={() => setScreen("articles")} className="p-1.5 rounded-lg hover:bg-slate-100 transition-colors">
          <ArrowLeft size={18} className="text-slate-500" />
        </button>
        <span className="text-sm font-semibold text-slate-600 truncate">{article.title}</span>
      </div>

      <div className="px-4 pt-5">
        {/* Category badge */}
        <div className="flex items-center gap-2 mb-4">
          <span className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full ${cat.color} ring-1 ${cat.ring}`}>
            <Icon size={12} /> {article.tag}
          </span>
          <span className="text-xs text-slate-400 flex items-center gap-1"><Clock size={11} /> 読了 {article.readTime}</span>
        </div>

        {/* Title */}
        <h1 className="text-lg font-bold text-slate-800 leading-snug mb-3">{article.title}</h1>

        {/* Summary */}
        <p className="text-sm text-slate-500 leading-relaxed bg-slate-50 rounded-xl p-4 mb-5 border border-slate-100">
          {article.summary}
        </p>

        {/* Care points */}
        <div className="mb-5">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-1 h-5 bg-teal-400 rounded-full" />
            <h2 className="text-sm font-bold text-slate-700">ケアのポイント</h2>
          </div>
          <div className="flex flex-col gap-3">
            {article.points.map((pt, i) => (
              <div key={i} className="flex gap-3 bg-white rounded-xl p-3.5 border border-slate-100 shadow-sm">
                <div className="shrink-0 w-6 h-6 rounded-full bg-teal-50 flex items-center justify-center ring-1 ring-teal-200">
                  <CheckCircle size={13} className="text-teal-500" />
                </div>
                <p className="text-sm text-slate-600 leading-relaxed">{pt}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Note */}
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6 flex gap-2.5">
          <Star size={15} className="text-amber-400 shrink-0 mt-0.5" />
          <p className="text-xs text-amber-700 leading-relaxed">{article.note}</p>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-br from-teal-500 to-cyan-400 rounded-2xl p-5 text-white text-center shadow-lg shadow-teal-200">
          <Phone size={24} className="mx-auto mb-2 opacity-90" />
          <p className="font-bold text-base mb-1">お困りの際は相談窓口へ</p>
          <p className="text-xs text-white/80 mb-4 leading-relaxed">24時間365日、訪問看護師が対応します。<br/>些細なことでもお気軽にご連絡ください。</p>
          <button className="w-full bg-white text-teal-600 font-bold text-sm py-3 rounded-xl shadow active:scale-95 transition-transform">
            📞　無料相談窓口に電話する
          </button>
        </div>
      </div>
    </div>
  );
}

function FAQScreen() {
  const [query, setQuery] = useState("");
  const [openIndex, setOpenIndex] = useState(null);

  const filtered = FAQS.filter(f =>
    f.q.includes(query) || f.a.includes(query)
  );

  return (
    <div className="pb-24 px-4">
      {/* Header */}
      <div className="pt-6 mb-5">
        <h2 className="text-base font-bold text-slate-700 mb-1">よくある質問</h2>
        <p className="text-xs text-slate-400 leading-relaxed">キーワードで検索するか、一覧から選んでください</p>
      </div>

      {/* Search */}
      <div className="flex items-center bg-white rounded-xl border border-slate-200 px-4 gap-2 mb-5 shadow-sm">
        <Search size={15} className="text-teal-400 shrink-0" />
        <input
          type="text"
          placeholder="質問を検索..."
          value={query}
          onChange={e => setQuery(e.target.value)}
          className="flex-1 py-3.5 text-sm text-slate-600 placeholder:text-slate-300 outline-none bg-transparent"
        />
        {query && <button onClick={() => setQuery("")}><X size={14} className="text-slate-300" /></button>}
      </div>

      {/* FAQ list */}
      {filtered.length === 0 ? (
        <div className="text-center py-10 text-slate-400 text-sm">該当する質問が見つかりませんでした</div>
      ) : (
        <div className="flex flex-col gap-2">
          {filtered.map((faq, i) => (
            <div key={i} className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full text-left px-4 py-4 flex items-start gap-3"
              >
                <span className="shrink-0 mt-0.5 w-5 h-5 rounded-full bg-teal-50 text-teal-500 text-xs font-bold flex items-center justify-center ring-1 ring-teal-200">Q</span>
                <p className="flex-1 text-sm font-semibold text-slate-700 leading-snug">{faq.q}</p>
                <ChevronDown
                  size={15}
                  className={`shrink-0 text-slate-400 mt-0.5 transition-transform duration-200 ${openIndex === i ? "rotate-180" : ""}`}
                />
              </button>
              {openIndex === i && (
                <div className="px-4 pb-4 border-t border-slate-50 pt-3 flex gap-3">
                  <span className="shrink-0 mt-0.5 w-5 h-5 rounded-full bg-green-50 text-green-500 text-xs font-bold flex items-center justify-center ring-1 ring-green-200">A</span>
                  <p className="text-sm text-slate-600 leading-relaxed">{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* CTA strip */}
      <div className="mt-6 bg-teal-50 border border-teal-200 rounded-2xl p-4 flex items-center gap-3">
        <div className="w-10 h-10 bg-teal-400 rounded-full flex items-center justify-center shrink-0">
          <Phone size={18} className="text-white" />
        </div>
        <div>
          <p className="text-xs font-bold text-teal-700">解決しない場合はお電話を</p>
          <p className="text-xs text-teal-500 leading-snug">24時間対応・相談無料</p>
        </div>
        <ChevronRight size={16} className="text-teal-400 ml-auto" />
      </div>
    </div>
  );
}

// ── App ───────────────────────────────────────────────────────────────────────

export default function App() {
  const [screen, setScreen] = useState("home");
  const [article, setArticle] = useState(null);

  return (
    <div className="min-h-screen bg-slate-50 flex justify-center">
      <div className="w-full max-w-sm min-h-screen relative bg-slate-50">
        {/* Status bar sim */}
        <div className="sticky top-0 z-40 bg-teal-500 h-1" />

        <div className="overflow-y-auto" style={{ minHeight: "100dvh" }}>
          {screen === "home" && (
            <HomeScreen
              setScreen={setScreen}
              setArticle={setArticle}
            />
          )}
          {screen === "articles" && (
            <ArticlesScreen setScreen={setScreen} setArticle={setArticle} />
          )}
          {screen === "article" && article && (
            <ArticleScreen article={article} setScreen={setScreen} />
          )}
          {screen === "faq" && <FAQScreen />}
        </div>

        <BottomNav screen={screen === "article" ? "articles" : screen} setScreen={setScreen} />
      </div>
    </div>
  );
}
