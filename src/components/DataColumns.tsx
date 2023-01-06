import React from 'react'

const defaultStatus = {
    A: ["Active", "success"],
    I: ["Inactive", "danger"],
    P: ["Pending", "warning"],
    X: ["Blocked", "grey"],
  };

const DataColumns = (props) => {
    const { status = defaultStatus } = props;
    
    
  return (
    <div>DataColumns</div>
  )
}

export default DataColumns