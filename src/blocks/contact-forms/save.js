export default function Save (props) {
  const {
    attributes: {
      id,
    },
  } = props
  return (
      <>
        {`[ib-contact-forms id='${id}']`}
      </>
  )
}
