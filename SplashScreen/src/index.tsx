import React, { createRef } from 'react';
import { Carousel } from 'antd';
import styles from './index.less';
import robot01 from './assets/img/Robot-01.gif';
import robot02 from './assets/img/Robot-02.gif';
import robot03 from './assets/img/Robot-03.gif';

interface Props {}

interface ButtonState {
  isRegistryButton: boolean;
  slideNumber: number;
}

class SplashScreen extends React.Component<Props, ButtonState> {

  private carousel: any;

  state: ButtonState;

  constructor(props: Props) {
    super(props);
    this.carousel = createRef();
    this.state = {
      isRegistryButton: false,
      slideNumber: 0,
    };
  }

  onChange(a: number) {
    if (a === 2) {
      this.setState({
        isRegistryButton: true,
        slideNumber: 0,
      });
    } else {
      this.setState({
        isRegistryButton: false,
        slideNumber: this.state.slideNumber + 1,
      });
    }
  }

  handleNext = () => this.carousel.current.next();

  handlePrev = () => this.carousel.current.prev();

  render() {
    const isRegistryBtn = this.state.isRegistryButton;
    const slideNumberBtn = this.state.slideNumber + 1;
    let btnReg;
    if (isRegistryBtn) {
      btnReg = <button className={`${styles.btnRegistry} ${styles.btn}`}>Regístrate</button>;
    } else {
      btnReg = (
        <button className={`${styles.nextButton} ${styles.btn}`} onClick={this.handleNext}>
          Siguiente
        </button>
      );
    }
    return (
      <div className="SplashScreen">
        <div className={`${styles.withBg}`}>
          <div className={`${styles.container}`}>
            <div className={`${styles.row}`}>
              <div className={`${styles.features}`}>
                <div className={`${styles.mainLogo}`}>
                  <div className={`${styles.icoLogo}`}></div>
                </div>
                <Carousel ref={this.carousel} afterChange={() => this.onChange(slideNumberBtn)}>
                  <div>
                    <img src={robot01} className={`${styles.frameRobot}`} alt="robot animado 1" />
                    <h1>
                      Tu cuenta <br />
                      de forma digital
                    </h1>
                    <h3>
                      Dónde y cuando lo <br />
                      prefieras
                    </h3>
                    <div className={`${styles.bottomSpace}`}></div>
                  </div>
                  <div>
                    <img src={robot02} className={`${styles.frameRobot}`} alt="robot animado 2" />
                    <h1>
                      "En menos" <br />
                      de 5 minutos
                    </h1>
                    <h3>
                      Olvídate del papeleo y <br />
                      de formularios extensos
                    </h3>
                  </div>
                  <div>
                    <img src={robot03} className={`${styles.frameRobot}`} alt="robot animado 3" />
                    <h1>
                      Rápido, <br />
                      fácil y seguro
                    </h1>
                    <h3>
                      Tu cuenta lista para <br />
                      usarse inmediatamente
                    </h3>
                  </div>
                </Carousel>
                <div className={styles.btnWrapper}>{btnReg}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SplashScreen;
