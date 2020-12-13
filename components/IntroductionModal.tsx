type IntroductionModalProps = {
  onClose: () => void,
}

const IntroductionModal: React.FC<IntroductionModalProps> = (props) => {
  return (
    <div className="modal fixed w-full h-full top-0 left-0 flex items-center justify-center">
      <div className="modal-overlay absolute w-full h-full bg-gray-900 opacity-50"></div>
      
      <div className="modal-container bg-white w-11/12 md:max-w-md mx-auto rounded z-20 shadow-lg overflow-y-auto">
        
        {
          false && (
            <div className="modal-close absolute top-0 right-0 cursor-pointer flex flex-col items-center mt-4 mr-4 text-white text-sm z-50" onClick={props.onClose}>
              <svg className="fill-current text-white" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
                <path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"></path>
              </svg>
              <span className="text-sm">(Esc)</span>
            </div>
          )
        }

        <div className="modal-content p-6 text-left">
          <div className="flex justify-between items-center pb-6">
            <p className="text-2xl font-bold">Welcome to wHBAR!</p>
          </div>
            <p>
              We are only providing a simple way of interacting with the wHBAR smart contract. If you send HBAR to the wrong Hedera account or use the wrong memo (your ethereum address) you will lose your HBAR.
              We take <span className="font-bold">zero </span>responsibility for any funds lost.
            </p>
            <p className="text-sm my-4 p-2 bg-red-100 rounded border-l-4 border-red-400">
            wHBAR is beta software. Use at your own risk.
            </p>
          <div className="flex justify-end pt-6">
            <button className="px-4 bg-blue-500 p-3 rounded text-white hover:bg-blue-400 hover:cursor-pointer" onClick={props.onClose}>Understand</button>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default IntroductionModal;