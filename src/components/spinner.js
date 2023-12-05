import React from 'react'
import Loading from './Loading.gif'

const Spinner = () => {

//export class Spinner extends Component {
  //render() {
    return (
      <div className='text-center'>
        <img className="my-3" src={Loading} alt="Loading" />
      </div>
    )
  //}
//}
}

export default Spinner
