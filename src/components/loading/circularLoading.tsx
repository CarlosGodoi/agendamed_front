export const CircularLoading = () => {
    return ( 
        <div className="flex justify-center items-center">
            <div className="flex w-6 h-6 items-center justify-center rounded-full border-4 border-dashed border-white animate-spin duration-1000">
                <div className="rounded-full"></div>
            </div>
        </div>
    )
}