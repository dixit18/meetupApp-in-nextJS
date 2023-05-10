import { MongoClient,ObjectId } from "mongodb";
import MeetupDetail from "../../components/meetups/MeetupDetail";
import Head from 'next/head'
function MeetupDetails(props){
    return (
        <>
         <Head>
    <title>{props.meetupData.title}</title>
    <meta name="description" content="don't open this page"/>
  </Head>
      <MeetupDetail
      image={props.meetupData.image}
      title={props.meetupData.title}
      address={props.meetupData.address}
      description={props.meetupData.description}
      />
      </>
    )
}

export async function getStaticPaths(){

    const client =  await MongoClient.connect("mongodb+srv://dixitparmar6113:F4vuFVsXLeBpYtpz@cluster0.cioy8sy.mongodb.net/?retryWrites=true&w=majority")
    const db = client.db()

    const meetupsCollection = db.collection('meetups')

    const meetups = await meetupsCollection.find({},{_id:1}).toArray()

    client.close()
    return {
        fallback:false,
        paths:meetups.map(meetup =>({params:{meetupId:meetup._id.toString()}}))
        
       
    }
}


// 

export async function getStaticProps(context){

    const meetupId = context.params.meetupId
    const client =  await MongoClient.connect("mongodb+srv://dixitparmar6113:F4vuFVsXLeBpYtpz@cluster0.cioy8sy.mongodb.net/?retryWrites=true&w=majority")
    const db = client.db()

    const meetupsCollection = db.collection('meetups')

    const Selectedmeetup = await meetupsCollection.findOne({_id: new ObjectId(meetupId)})

    client.close()
    
    return {
        props:{
            meetupData:{
                id:Selectedmeetup._id.toString(),
                title:Selectedmeetup.title,
                address:Selectedmeetup.address,
                image:Selectedmeetup.image,
                description:Selectedmeetup.description
            }
        }
    }
}
export default MeetupDetails