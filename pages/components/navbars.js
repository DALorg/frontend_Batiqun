const Navbarz = ({Last2Page, LastPage, CurrentPage}) => {

    return (
        <nav class="navbar navbar-main navbar-expand-lg px-0 mx-4 shadow-none border-radius-xl " id="navbarBlur" data-scroll="false">
        <div class="container-fluid py-1 px-3">
          <nav aria-label="breadcrumb">
            <ol class="breadcrumb bg-transparent mb-0 pb-0 pt-1 px-0 me-sm-6 me-5">
            {Last2Page != null ? 
            <li class="breadcrumb-item text-sm"><a class="opacity-5 text-white" href="javascript:;">{Last2Page}</a></li>
            : null}
            {LastPage != null ?  
            <li class="breadcrumb-item text-sm"><a class="opacity-5 text-white" href="javascript:;">{LastPage}</a></li>
            : null}
            <li class="breadcrumb-item text-sm text-white active" aria-current="page">{CurrentPage}</li>
            </ol>
            <h6 class="font-weight-bolder text-white mb-0">{CurrentPage}</h6>
          </nav>
        </div>
      </nav>
  );
};

export default Navbarz;
