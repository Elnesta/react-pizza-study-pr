import React from 'react'
import ContentLoader from 'react-content-loader';

const MyLoader = (props) => (
  <ContentLoader 
    className='pizza-block'
    speed={2}
    width={280}
    height={465}
    viewBox="0 0 280 465"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <circle cx="134" cy="136" r="120" /> 
    <rect x="0" y="313" rx="10" ry="10" width="280" height="89" /> 
    <rect x="0" y="427" rx="10" ry="10" width="90" height="30" /> 
    <rect x="122" y="418" rx="30" ry="30" width="152" height="45" /> 
    <rect x="0" y="270" rx="10" ry="10" width="280" height="27" />
  </ContentLoader>
)

export default MyLoader