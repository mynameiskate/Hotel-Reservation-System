import React from 'react';

const PageBar = ( {currentPage, nextPage, goToPage} ) => (
    <div className="pageBar">
        {
            (currentPage - 1 > 0)
            ?   <button
                    className="pageBarBtn prevBtn"
                    type="button"
                    onClick={() => goToPage(currentPage - 1)}
                />
            : <div className="btnPlaceholder"/>
        }
        { currentPage && <h4>Page: {currentPage}</h4> }
        {   nextPage
            ?   <button
                    className="pageBarBtn nextBtn"
                    type="button"
                    onClick={() => goToPage(nextPage)}
                />
            : <div className="btnPlaceholder"/>
        }
    </div>
)

export default PageBar;