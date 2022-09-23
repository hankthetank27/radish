interface MessageProps {
  message: string
}

export const Message = ({ message }: MessageProps) => {
  return (
    <div className="message">{message}</div>
  )
}