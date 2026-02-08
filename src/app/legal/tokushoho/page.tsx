import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const ITEMS = [
  { label: "販売業者", value: "請求があった場合は遅滞なく開示します" },
  { label: "代表者", value: "請求があった場合は遅滞なく開示します" },
  { label: "所在地", value: "請求があった場合は遅滞なく開示します" },
  {
    label: "連絡先",
    value:
      "tomoya.fujita@fluxenic.com（電話番号は請求があった場合に遅滞なく開示）",
  },
  { label: "販売URL", value: "https://linghost.com" },
  {
    label: "販売価格",
    value: "月額プラン: 980円（税込） / 年額プラン: 9,800円（税込）",
  },
  {
    label: "商品等の内容",
    value:
      "AI ストーリー生成サービスの利用（生成回数の増加、プレミアム機能の利用）",
  },
  {
    label: "提供形態",
    value: "ウェブブラウザを通じたオンラインサービスの提供",
  },
  { label: "提供時期", value: "決済完了後、即時利用可能" },
  { label: "支払方法", value: "クレジットカード（Stripe決済）" },
  {
    label: "支払時期",
    value: "月額プラン: 毎月自動課金 / 年額プラン: 毎年自動課金",
  },
  {
    label: "解約・キャンセル",
    value: "いつでも解約可能。解約後は契約期間終了まで利用可能。",
  },
  {
    label: "返品・返金",
    value: "デジタルサービスの性質上、返金は不可。",
  },
  {
    label: "動作環境",
    value:
      "モダンウェブブラウザ（Chrome, Firefox, Safari, Edge の最新版）",
  },
  {
    label: "追加手数料",
    value: "なし（インターネット接続費用等はお客様負担）",
  },
] as const;

export default function TokushohoPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="pb-12">
          <Link
            href="/"
            className="inline-flex items-center gap-1 text-sm text-zinc-500 hover:text-zinc-300 transition-colors mb-6"
          >
            &larr; Home
          </Link>

          <h2 className="font-serif text-3xl font-bold text-zinc-50 mb-8">
            特定商取引法に基づく表記
          </h2>

          <div className="border border-zinc-800/40 rounded-xl overflow-hidden">
            {ITEMS.map((item, i) => (
              <div
                key={item.label}
                className={`flex flex-col sm:flex-row ${
                  i !== ITEMS.length - 1
                    ? "border-b border-zinc-800/40"
                    : ""
                }`}
              >
                <div className="sm:w-44 flex-shrink-0 px-5 py-4 bg-zinc-900/60 text-sm font-medium text-zinc-300">
                  {item.label}
                </div>
                <div className="flex-1 px-5 py-4 text-sm text-zinc-400">
                  {item.value}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
