import blobs from  '../images/blobs.png'
import blobsAzul from  '../images/blobsAzul.png'

export default function Background(){
    return(
        <>
            <div className='blob-superior'>
                <img src={blobs} />
            </div>
            <div className='blob-inferior'>
                <img src={blobsAzul} />
            </div>
        </>
    )
}