import react from "react";


const Custompaginations = ({ PageNow, TotalDisplayed, TotalProduct, isRouterQuery }) => {

var Pages = PageNow;
var LastPages = parseInt(TotalProduct)/parseInt(TotalDisplayed);
var LastPage = Math.ceil(LastPages);    

const NextPage = (e) => {
    e.preventDefault();
    Pages = parseInt(Pages) + 1;
    if(isRouterQuery){
      let text = window.location.href;
      let test = text.replace("&Page=" + PageNow, "");
      setTimeout(location.href = test + "&Page=" + Pages, 1000);
    }else{
      setTimeout(location.href = "?Page=" + Pages, 1000);
    }
}

const PrevPage = (e) => {
  e.preventDefault();
  Pages = parseInt(Pages) - 1;
  if(isRouterQuery){
    let text = window.location.href;
    let test = text.replace("&Page=" + PageNow, "");
    setTimeout(location.href = test + "&Page=" + Pages, 1000);
  }else{
    setTimeout(location.href = "?Page=" + Pages, 1000);
  }
}

  return (
    <nav aria-label="Page navigation example mt-4">
    <ul className="pagination">
        <li className={PageNow == 1
                      ? "page-item disabled"
                      : "page-item"
                    }>
        <a className="page-link" onClick={PrevPage} href="javascript:;" aria-label="Previous">
            <i className="fa fa-angle-left"></i>
            <span className="sr-only">Previous</span>
        </a>
        </li>
        <li className={PageNow == LastPage || PageNow != 0
                      ? "page-item disabled"
                      : "page-item"
                    }>
        <a className="page-link" onClick={NextPage} href="javascript:;" aria-label="Next">
            <i className="fa fa-angle-right"></i>
            <span className="sr-only">Next</span>
        </a>
        </li>
    </ul>
    </nav>
  );
};

export default Custompaginations;
