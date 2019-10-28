export const formatDate = date => {
  const dateTime = new Date(date)
  const YY = dateTime.getFullYear()
  const MM =
dateTime.getMonth() + 1 < 10
  ? '0' + (dateTime.getMonth() + 1)
  : dateTime.getMonth() + 1
  const D =
    dateTime.getDate() < 10 ? '0' + dateTime.getDate() : dateTime.getDate()
  const hh =
    dateTime.getHours() < 10 ? '0' + dateTime.getHours() : dateTime.getHours()
  const mm =
    dateTime.getMinutes() < 10 ? '0' + dateTime.getMinutes() : dateTime.getMinutes()
  const ss = dateTime.getSeconds() < 10 ? '0' + dateTime.getSeconds() : dateTime.getSeconds()
  return `${YY}-${MM}-${D} ${hh}:${mm}:${ss}`
}

export const formatDuring = (time) => {
  var hours = Math.floor(time / 1000 / 60 / 60)
  var minutes = Math.floor(time / 1000 / 60)
  var seconds = time / 1000 - minutes * 60

  return (
    (hours > 0 ? hours + ':' : '') +
    (minutes > 0 ? minutes + ':' : '') +
    (seconds > 0 ? (seconds < 10 ? '0' + seconds : Math.floor(seconds)) : '00')
  )
}
