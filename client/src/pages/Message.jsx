import { useParams } from "react-router-dom"

const Message = () => {
  const { id } = useParams()
  console.log(id)
  return (
    <div>Message</div>
  )
}

export default Message
