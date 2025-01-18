import { useState } from 'react'
import './App.css'
import Editor from './components/editor'
import Review from './components/Review'

import { Webchat, WebchatProvider, Fab, getClient } from "@botpress/webchat";
import { buildTheme } from "@botpress/webchat-generator";

const { theme, style } = buildTheme({
  themeName: "prism",
  themeColor: "#634433",
});

const clientId = "4f12ef87-add3-4504-8703-334857c72391";


function App() {
  const client = getClient({ clientId });
  const [isWebchatOpen, setIsWebchatOpen] = useState(false);
  const toggleWebchat = () => {
    setIsWebchatOpen((prevState) => !prevState);
  };

 
  const [review,setReview] = useState("")
  const [state,setState] = useState<'idle'|'generating' |'generated'>('idle');
  const isgenerating = state ==="generating";

  const handlegeneratereview =  async (code:string)=>{
        setState('generating');
       try{
        const response  = await fetch("http://localhost:3000/api/v1/reviews",{
          method:"POST",
          headers:{
            'Content-Type':'application/json',
          },
    
          body:JSON.stringify({code}),
          })

          const data = await response.json();
          setReview(data.review)
          
       }

       catch(error){
        alert("something went wrong");
        console.log(error);
       }

       setState('generated');
    
      
      
 }
  
  return (
   <div className='flex h-full w-full items-center overflow-hidden'>
        <Editor isGenerating={isgenerating} ongeneratereview={handlegeneratereview}/>
        <Review isGenerating={isgenerating} review={review}/>

        <div style={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: 1000}}>
      <style>{style}</style>
      <WebchatProvider
        theme={theme}
        client={client}
      >
        <Fab onClick={toggleWebchat} />
        <div
          style={{
            display: isWebchatOpen ? 'block' : 'none',
            position: 'absolute',
            bottom: '70px', 
            right: '0',
            width: '300px', 
            height: '400px', 
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            borderRadius: '8px',
            overflow: 'hidden',
          }}
        >
          <Webchat />
        </div>
      </WebchatProvider>
    </div>

   </div>
   
      
  )}

export default App
