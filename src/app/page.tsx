import { Contents } from "@/components/Contents";
import { Cover } from "@/components/Cover";
import { FeatureLinen } from "@/components/FeatureLinen";
import { FeatureMorning } from "@/components/FeatureMorning";
import { Folio } from "@/components/Folio";
import { Masthead } from "@/components/Masthead";
import { Pieces } from "@/components/Pieces";
import { Reveal } from "@/components/Reveal";
import { Store } from "@/components/Store";
import { Talk } from "@/components/Talk";

export default function Home() {
  return (
    <>
      <Masthead />
      <main>
        <Cover />
        <Contents />
        <FeatureMorning />
        <FeatureLinen />
        <Pieces />
        <Talk />
        <Store />
      </main>
      <Folio />
      <Reveal />
    </>
  );
}
