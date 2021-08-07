const SideModal = (props) => {
  return(
    <div className="fixed inset-0 overflow-hidden" aria-labelledby="slide-over-title" role="dialog" aria-modal="true">
      <div className="absolute inset-0 overflow-hidden">
        <div onClick={e=>{props.setFeatureToggle(false)}} className="absolute inset-0 bg-gray-800 bg-opacity-95 transition-opacity" aria-hidden="true" />
        <div className="fixed inset-y-0 right-0 pl-10 max-w-full flex">
          <div className="relative w-screen max-w-md">
            <div className="absolute top-0 left-0 -ml-8 pt-4 pr-2 flex sm:-ml-10 sm:pr-4">
              <button 
                onClick={e=>{props.setFeatureToggle(false)}}
                className="rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
              >
                <span className="sr-only">Close panel</span>
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="h-full flex flex-col pb-12 pt-6 lg:pb-0 bg-white shadow-xl overflow-y-scroll">
              <div className="px-4 sm:px-6">
                <h2 className="text-lg font-medium text-gray-900" id="slide-over-title">
                  {props?.title}
                </h2>
              </div>
              <div className="h-full mt-6 relative flex-1 px-4 sm:px-6">
                <div className="h-full absolute inset-0 px-4 sm:px-6">
                  <div className="h-full border-2 border-dashed p-6 border-gray-200" aria-hidden="true">
                    {props?.children}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};

export default SideModal;