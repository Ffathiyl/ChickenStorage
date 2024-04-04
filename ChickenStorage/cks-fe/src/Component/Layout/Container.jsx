import ContentBody from "./Content";


export default function Container({ children }) {
    return (
      <div className="">
        <ContentBody>{children}</ContentBody>
      </div>
    );
  }