import {
  Document,
  Page,
  Text,
  View,
  PDFViewer,
  Link,
  Font,
} from "@react-pdf/renderer";
import { useQuery, useQueryClient } from "react-query";
import { getCards } from "../utils/firebase/firestore/cards.firestore";
import { useAppSelector } from "../utils/redux/hooks";

const space: number = 24;
// Create Document Component
const RenderCase = () => {
  const cardsObject = useQuery("cards", getCards).data;
  const {topic, side} = useAppSelector(state => state.app);

  const evidences: Evidence[] = [];
  const rebuttals: Rebuttal[] = [];
  const quotes: Quote[] = [];
  const statistics: Statistic[] = [];

  if(cardsObject != undefined){
    Object.keys(cardsObject).forEach(key => {
      const card = cardsObject[key];
      switch(card.type){
        case "evidence": evidences.push(card); break;
        case "rebuttal": rebuttals.push(card); break;
        case "statistic": statistics.push(card); break;
        case "quote": quotes.push(card); break;
      }
    })
  }

  const team = useQueryClient().getQueryData('team') as Team;
  const contentions = team?.contentions;
  Font.register({
    family: 'GideonRoman',
    src: './fonts/GideonRoman-Regular.ttf'
  });
  return (
    <PDFViewer className="w-full h-full">
      <Document title={`${side} ${topic} case`}>
          <Page size="A4" style={{padding: space, fontSize: space/2, fontFamily: 'GideonRoman'}} >
              <View>
                  <Text style={{fontSize: space, marginBottom: space, textAlign: 'center', border: 2, borderRadius: space/4, padding: space/2, marginHorizontal: space*3}}>{`${side == "AFF"? "Affirmative" : "Negative"}`}</Text>
              </View>
              {contentions.map((cont, index) => (
                <View key={index}>
                  {evidences.filter(card => card.contSub.contentionID == contentions[cont.index].contentionID).length > 0? <Text style={{fontSize: space, textAlign: 'center', marginBottom: space/2}}>Contention {cont.index}: {cont.name}</Text> : null}
                  {cont.subpoints.map((sub, i) => (
                    <View>
                      {evidences.filter(card => card.contSub.contentionID == contentions[cont.index].contentionID && card.contSub.subpointID == contentions[cont.index].subpoints[i].subpointID).map(card => (
                      <View key={card.cardID} style={{marginBottom: space}} wrap={false}>
                        <Link src={`http://localhost:3000/cards/${card.cardID}`} style={{fontSize: space*3/4, paddingBottom: space/4}}>{card.title}</Link>
                        <Text style={{paddingBottom: space/4}}>Contention {cont.index}, Subpoint {i+1}</Text>
                        <Text style={{marginBottom: space/4, padding: space/4, border: 2, borderRadius: space/4,}}>"{card.data}" [<Link src={card.sourceLink}>{card.sourceName}</Link>]</Text>
                        <Text>{card.warrant}</Text>
                        {sub.name}
                      </View>
                    ))}
                    </View>
                  ))}
                </View>
              ))}
        </Page>
      </Document>
    </PDFViewer>
  );
}

export default RenderCase;