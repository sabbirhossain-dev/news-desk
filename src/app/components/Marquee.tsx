import MarqueeText from "react-marquee-text";
import "react-marquee-text/dist/styles.css";

interface NewsItem {
  id: string | number;
  title: string;
}

const Marquee = async () => {
  const res = await fetch("https://news-api-v2.vercel.app/api/news?limit=10");

  const data = await res.json();
  const headlines: NewsItem[] = data.data;

  return (
    <div className="bg-green-700 text-white">
      <div className="max-w-7xl mx-auto flex items-center ">
        <p className="px-3 font-bold bg-green-800 py-2">সর্বশেষ</p>
        <MarqueeText direction="right" duration={15}>
          <div className="flex items-center whitespace-nowrap animate-marquee">
            {[...headlines, ...headlines].map((item, index) => (
              <span key={`${item.id}-${index}`} className="font-medium py-1">
                {item.title}
                <span className="px-5 font-bold text-lg">•</span>
              </span>
            ))}
          </div>
        </MarqueeText>
      </div>
    </div>
  );
};

export default Marquee;
