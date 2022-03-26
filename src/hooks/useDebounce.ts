const useDebounce = <T extends (...args:any)=>any>(fn:T,timeout:number)=>{
  let timeOutID:NodeJS.Timeout|undefined;
  
  return function(...args:Parameters<T>){
    console.log(111)
    if(!timeOutID){
      clearTimeout(timeOutID)
      timeOutID=setTimeout(()=>{
        fn.apply(null,args)
        timeOutID=undefined
      },timeout)
    }
  }
}
export default useDebounce