import { useEffect, useState } from "react";
import useCopyToClipboard from "../../hooks/useCopyToClipboard";

type CopyableInfoProps = {
  title;
  content;
}

const CopyableInfo: React.FC<CopyableInfoProps> = (props) => {

  const [isCopied, handleCopy] = useCopyToClipboard(1000);

  return (
    <div className="border flex flex-row justify-between rounded items-center">
      <div className="p-4 flex flex-col items-start ">
        <label htmlFor="company_website" className="block text-sm font-medium text-gray-700 mb-1">
          {props.title}
        </label>
        <div className="rounded text-gray-400 flex justify-between items-center">
          <span className="text-sm">{props.content}</span>
        </div>
      </div>
      <div className="flex flex-row p-4 items-center">
        <button className={`w-6 h-6 text-gray-400 focus:outline-none ${isCopied ? "text-green-500" : "text-gray-400"}`} title="COPY" onClick={() => handleCopy(props.content)}>
          {
            isCopied ? (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>  
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            )
          }
        </button>
      </div>
    </div>
  );
}

export default CopyableInfo;