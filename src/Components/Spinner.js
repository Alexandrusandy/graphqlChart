import ClipLoader from "react-spinners/ClipLoader";

const Spinner = () => {
  return (
    <div style={{display: 'flex',justifyContent:'center',height:'100vh',alignItems:'center'}}>
    <ClipLoader color="#36d7b7"  size={150}    speedMultiplier={0.5}/>
  </div>
  )
}

export default Spinner