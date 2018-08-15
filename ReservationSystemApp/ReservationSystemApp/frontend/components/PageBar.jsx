import React from 'react';

const PageBar = ( {currentPage, nextPage, goToPage} ) => (
    <div>
        {
            (currentPage - 1 > 0) &&
                <button type='button' onClick={() => goToPage(currentPage - 1)}>previous</button>
        }
        { currentPage && <h4>Page: {currentPage}</h4> }
        {   nextPage &&
                <button type='button' onClick={() => goToPage(nextPage)}>next</button>
        }
    </div>
)

export default PageBar;