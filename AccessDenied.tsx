import Link from "next/link";
import { siteConfig } from "@/lib/config";
export default function Home() {
  return (
    <section className="hero">
      <div className="hero-text">
        <h1>{siteConfig.homeHeadline}</h1>
        <p>{siteConfig.homeText}</p>
        <div className="row"><Link className="btn btn-red" href="/academic/routine">View Routine</Link><Link className="btn btn-outline" href="/students/names">Name List</Link></div>
      </div>
    </section>
  );
}
