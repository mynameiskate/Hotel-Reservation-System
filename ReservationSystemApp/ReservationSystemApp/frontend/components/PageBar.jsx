import React from 'react';

const PageBar = ( {currentPage, nextPage, goToPage} ) => (
    <div>
        {
            (currentPage - 1 > 0) &&
                <button type='button' onClick={() => goToPage(currentPage - 1)}>back</button>
        }
        { currentPage && <h4>Page: {currentPage}</h4> }
        {   nextPage &&
                <button type='button' onClick={() => goToPage(nextPage)}>forward</button>
        }
    </div>
)

export default PageBar;