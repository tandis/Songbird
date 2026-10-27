import { useMemo, useState } from "react";

const EMOJI_GROUPS = [
  {
    id: "popular",
    label: "پرکاربرد",
    emojis: [
      ["😀", "خوشحال happy smile"], ["😂", "خنده laugh tears"], ["😍", "عاشق love eyes"],
      ["🥰", "عشق hearts"], ["😊", "لبخند blush"], ["😎", "باحال cool sunglasses"],
      ["😭", "گریه crying"], ["🥹", "اشک شوق touched"], ["😘", "بوس kiss"],
      ["😢", "ناراحت sad"], ["😮", "تعجب surprised"], ["🤔", "فکر thinking"],
      ["❤️", "قلب قرمز heart red"], ["💚", "قلب سبز green heart"], ["💕", "عشق love hearts"],
      ["👍", "لایک پسند like thumb"], ["👎", "نپسند dislike"], ["👏", "تشویق clap"],
      ["🙏", "ممنون دعا thanks pray"], ["🔥", "آتش fire"], ["🎉", "جشن party celebration"],
      ["✅", "تأیید check"], ["💯", "صد امتیاز hundred"], ["🌹", "گل رز rose"],
    ],
  },
  {
    id: "faces",
    label: "چهره‌ها",
    emojis: [
      ["🙂", "لبخند smile"], ["😄", "خوشحال happy"], ["😁", "دندان grin"],
      ["🤣", "خنده rolling laugh"], ["😅", "خنده عرق sweat"], ["😉", "چشمک wink"],
      ["😋", "خوشمزه yummy"], ["😜", "شیطنت playful"], ["🤩", "هیجان star eyes"],
      ["🥳", "تولد party"], ["😇", "فرشته angel"], ["😌", "آرام relaxed"],
      ["😴", "خواب sleepy"], ["😡", "عصبانی angry"], ["😱", "ترس scream"],
      ["🤯", "شگفت زده mind blown"], ["🤗", "بغل hug"], ["🙃", "برعکس upside down"],
    ],
  },
  {
    id: "gestures",
    label: "دست‌ها",
    emojis: [
      ["👋", "سلام خداحافظ wave"], ["👌", "اوکی okay"], ["✌️", "پیروزی victory"],
      ["🤝", "دست دادن handshake"], ["💪", "قدرت strong"], ["🙌", "هورا hooray"],
      ["🫶", "قلب با دست heart hands"], ["🤞", "آرزو crossed fingers"],
      ["👀", "چشم eyes"], ["👑", "تاج crown"], ["🎁", "هدیه gift"],
      ["💐", "گل دسته flowers"], ["☕", "قهوه coffee"], ["⭐", "ستاره star"],
      ["✨", "درخشش sparkles"], ["🚀", "موشک rocket"], ["💡", "ایده idea"],
    ],
  },
];

export default function EmojiPicker({ onSelect }) {
  const [activeGroup, setActiveGroup] = useState("popular");
  const [search, setSearch] = useState("");
  const items = useMemo(() => {
    const query = search.trim().toLocaleLowerCase();
    const groups = query
      ? EMOJI_GROUPS
      : EMOJI_GROUPS.filter((group) => group.id === activeGroup);
    const seen = new Set();
    return groups.flatMap((group) =>
      group.emojis.filter(([emoji, description]) => {
        if (seen.has(emoji)) return false;
        if (query && !description.toLocaleLowerCase().includes(query) && !emoji.includes(query))
          return false;
        seen.add(emoji);
        return true;
      }),
    );
  }, [activeGroup, search]);

  return (
    <div
      id="songbird-emoji-picker"
      role="dialog"
      aria-label="انتخاب ایموجی"
      dir="rtl"
      className="absolute bottom-[calc(100%+0.75rem)] right-0 z-50 w-80 max-w-[calc(100vw-2rem)] rounded-2xl border border-emerald-200 bg-white p-3 shadow-xl dark:border-emerald-500/30 dark:bg-slate-900"
    >
      <label htmlFor="songbird-emoji-search" className="sr-only">
        جستجوی ایموجی
      </label>
      <input
        id="songbird-emoji-search"
        type="search"
        autoComplete="off"
        placeholder="جستجوی ایموجی..."
        value={search}
        onChange={(event) => setSearch(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === "Enter") event.preventDefault();
        }}
        className="mb-3 w-full rounded-xl border border-emerald-200 bg-white px-3 py-2 text-sm text-slate-800 outline-hidden focus:border-emerald-500 dark:border-emerald-500/40 dark:bg-slate-800 dark:text-white"
      />
      <div className="mb-2 flex gap-1" aria-label="دسته‌های ایموجی">
        {EMOJI_GROUPS.map((group) => (
          <button
            key={group.id}
            type="button"
            aria-pressed={activeGroup === group.id}
            onClick={() => {
              setActiveGroup(group.id);
              setSearch("");
            }}
            className={`flex-1 rounded-lg px-2 py-1.5 text-xs transition ${
              activeGroup === group.id && !search
                ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-100"
                : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
            }`}
          >
            {group.label}
          </button>
        ))}
      </div>
      <div className="grid max-h-52 grid-cols-6 gap-1 overflow-y-auto" aria-label="ایموجی‌ها">
        {items.map(([emoji, description]) => (
          <button
            key={emoji}
            type="button"
            title={description}
            aria-label={description.split(" ")[0]}
            onPointerDown={(event) => event.preventDefault()}
            onClick={() => onSelect(emoji)}
            className="flex h-10 items-center justify-center rounded-lg text-2xl transition hover:bg-emerald-100 focus-visible:outline-2 focus-visible:outline-emerald-500 dark:hover:bg-slate-800"
          >
            {emoji}
          </button>
        ))}
      </div>
      {items.length === 0 ? (
        <p className="py-6 text-center text-sm text-slate-500">ایموجی پیدا نشد.</p>
      ) : null}
    </div>
  );
}
