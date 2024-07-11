export default function Save (props) {
  const {
    attributes: {
      id,
    },
  } = props
  return (
      <>
        {`[isvek-contact-forms id='${id}']`}
      </>
  )
}
