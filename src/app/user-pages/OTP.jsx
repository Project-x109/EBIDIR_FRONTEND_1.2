import React, { useRef } from "react";
//import { TextInput } from "react-native";
import "./OTP.css";
import image3 from "../../assets/images/Group 3.png"


const OTP = () => {
  const inputRef1 = useRef(null);
  const inputRef2 = useRef(null);
  const inputRef3 = useRef(null);
  const inputRef4 = useRef(null);

  const onSubmitEditing1 = () => {
    inputRef2.current.focus();
  };

  const onSubmitEditing2 = () => {
    inputRef3.current.focus();
  };

  const onSubmitEditing3 = () => {
    inputRef4.current.focus();
  };

  const onKeyPress2 = ({ nativeEvent }) => {
    if (nativeEvent.key === "Backspace" && !nativeEvent.target.value) {
      inputRef1.current.focus();
    }
  };

  const onKeyPress3 = ({ nativeEvent }) => {
    if (nativeEvent.key === "Backspace" && !nativeEvent.target.value) {
      inputRef2.current.focus();
    }
  };

  const onKeyPress4 = ({ nativeEvent }) => {
    if (nativeEvent.key === "Backspace" && !nativeEvent.target.value) {
      inputRef3.current.focus();
    }
  };
  return (
    <div>
      {/* {loading && <BackdropLoader />} */}
      <section class="text-center text-lg-start">
        <div class="container py-4  rounded">
          <div class="row g-0 align-items-center">
            <div class="col-lg-4 mb-5 mb-lg-0">
              <div class="cardLow">
                <div class="card notificationCard">
                  <form class="form">
                    <p class="heading">Verify</p>
                    <svg
                      class="check"
                      version="1.1"
                      id="Layer_1"
                      xmlns="http://www.w3.org/2000/svg"
                      //xmlns:xlink="http://www.w3.org/1999/xlink"
                      x="0px"
                      y="0px"
                      viewBox="0 0 100 100"
                      // xml:space="preserve"
                    >
                      {" "}
                      <image
                        class="image"
                        id="image0"
                        x="0"
                        y="0"
                        href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAQAAACQ9RH5AAAABGdBTUEAALGPC/xhBQAAACBjSFJN
                                                    AAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QA/4ePzL8AAAAJcEhZ
                                                    cwAACxMAAAsTAQCanBgAAAAHdElNRQfnAg0NDzN/r+StAAACR0lEQVRYw+3Yy2sTURTH8W+bNgVf
                                                    aGhFaxNiAoJou3FVEUQE1yL031BEROjCnf4PLlxILZSGYncuiiC48AEKxghaNGiliAojiBWZNnNd
                                                    xDza3pl77jyCyPzO8ubcT85wmUkG0qT539In+MwgoxQoUqDAKDn2kSNLlp3AGi4uDt9xWOUTK3xg
                                                    hVU2wsIZSkxwnHHGKZOxHKfBe6rUqFGlTkPaVmKGn6iYao1ZyhK2zJfY0FZ9ldBzsbMKxZwZjn/e
                                                    5szGw6UsD5I0W6T+hBhjUjiF7bNInjz37Ruj3igGABjbtpIo3GIh30u4ww5wr3fwfJvNcFeznhBs
                                                    YgXw70TYX2bY/ulkZhWfzfBbTdtrzjPFsvFI+T/L35jhp5q2owDs51VIVvHYDM9sa/LY8XdtKy1l
                                                    FXfM8FVN2/X2ajctZxVXzPA5TZvHpfb6CFXxkerUWTOcY11LX9w0tc20inX2mmF4qG3upnNWrOKB
                                                    hIXLPu3dF1x+kRWq6ysHpkjDl+7eQjatYoOCDIZF3006U0unVSxIWTgTsI3HNP3soSJkFaflMDwL
                                                    3OoHrph9YsPCJJ5466DyOGUHY3Epg2rWloUxnMjsNw7aw3AhMjwVhgW4HYm9FZaFQZ/bp6QeMRQe
                                                    hhHehWKXGY7CAuSpW7MfKUZlAUqWdJ3DcbAAB3guZl9yKC4WYLfmT4muFtgVJwvQx7T2t0mnXK6J
                                                    XlGGyAQvfNkaJ5JBmxnipubJ5HKDbJJsM0eY38QucSx5tJWTVHBwqDDZOzRNmn87fwDoyM4J2hRz
                                                    NgAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAyMy0wMi0xM1QxMzoxNTo1MCswMDowMKC8JaoAAAAldEVY
                                                    dGRhdGU6bW9kaWZ5ADIwMjMtMDItMTNUMTM6MTU6NTArMDA6MDDR4Z0WAAAAKHRFWHRkYXRlOnRp
                                                    bWVzdGFtcAAyMDIzLTAyLTEzVDEzOjE1OjUxKzAwOjAwIIO3fQAAAABJRU5ErkJggg=="
                      ></image>
                    </svg>
                    <div class="box">
                      <input
                        ref={inputRef1}
                        onInput={onSubmitEditing1}
                        class="input"
                        type="text"
                        max="9"
                        maxLength={1}
                      />
                      <input
                        ref={inputRef2}
                        onInput={onSubmitEditing2}
                        class="input"
                        type="text"
                        onKeyUp={onKeyPress2}
                        max="9"
                        maxLength={1}
                      />
                      <input
                        ref={inputRef3}
                        onInput={onSubmitEditing3}
                        class="input"
                        type="text"
                        onKeyUp={onKeyPress3}
                        max="9"
                        maxLength={1}
                      />
                      <input
                        ref={inputRef4}
                        class="input"
                        type="text"
                        max="9"
                        maxLength={1}
                        onKeyUp={onKeyPress4}
                      />
                    </div>
                    <button class="btn1">Submit</button>
                    <button class="btn2">Back</button>
                  </form>
                </div>
              </div>
            </div>
            <div class="col-lg-6 mb-5 mb-lg-0 imagehide">
              <img
                style={{ height: "95vh" }}
                src={image3}
                class="w-100 rounded-4 shadow-4 imagehide"
                alt=""
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
export default OTP;
