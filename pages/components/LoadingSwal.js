import Swal from "sweetalert2";

const LoadingSwal = () => {
    let timerInterval
    return(
      Swal.fire({
        title: 'Loading, Please Wait!',
        html: 'I will close in <b></b> milliseconds.',
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading()
          const b = Swal.getHtmlContainer().querySelector('b')
          timerInterval = setInterval(() => {
            b.textContent = Swal.getTimerLeft()
          }, 100)
        },
        willClose: () => {
          clearInterval(timerInterval)
        }
      }).then((result) => {
        /* Read more about handling dismissals below */
        if (result.dismiss === Swal.DismissReason.timer) {
          console.log('I was closed by the timer')
        }
      })
  )
};

export default LoadingSwal;
