import React from 'react'

const Pagination = ({dataObjectsPerPage, totalDataObjects, paginate, perviousPage, nextPage, currentPage}) => {

    // Array initialized to holder number of pages.
    const pageNumbers = [];

    // Calculating number of pages.
    for(let i=1;i<=Math.ceil(totalDataObjects / dataObjectsPerPage);i++){
        pageNumbers.push(i);
    }
    const firstPage = 1;
    const lastPage = pageNumbers.length;
    return (
        <nav>
            <ul className="pagination">
            <button className="page-item btn btn-secondary" disabled={(currentPage === firstPage) ? true: false} onClick={perviousPage}>Previous</button>
                {pageNumbers.map(number => (
                    <li key={number} className="page-item">
                        <a onClick={() => paginate(number)} href="!#" className="page-link">
                            {number}
                        </a>
                    </li>
                ))}
            <button className="page-item btn btn-secondary" disabled={(currentPage === lastPage) ? true: false} onClick={nextPage}>Next</button>
            </ul>
        </nav>
    )
}

export default Pagination
