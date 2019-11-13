import React from 'react'

const AllEntries = ({ entries }) => {
  return (
    <div>
      <center><h1>FACEX</h1></center>
      {entries.map((entry) => (
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">{entry.id}</h5>
            <h6 class="card-subtitle mb-2 text-muted">{entry.identity}</h6>
            <p class="card-text">{entry}</p>
          </div>
        </div>
      ))}
    </div>
  )
};

export default AllEntries;