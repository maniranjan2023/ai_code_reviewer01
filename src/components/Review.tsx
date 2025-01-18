import MarkdownPreview from '@uiw/react-markdown-preview';
import Loader from './Loader';
const Review = ({review,isGenerating}:{review:string,isGenerating:boolean}) => {
  return (
    <div className="h-full w-6/12 relative overflow-scroll">
        {isGenerating ? <Loader/> :<MarkdownPreview source={review} style={{ fontSize: "30px" , minHeight:"100vh",padding:"20px",}} />}
      
    </div>
  );
};

export default Review;
