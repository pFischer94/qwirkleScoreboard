import { useEffect } from "react";
import "./test.css"

export function withSplit<P extends JSX.IntrinsicAttributes>(
  Component1: React.ComponentType<P>,
  Component2: React.ComponentType<P>,
) {
    function WithRoot(props: P) {
        const end = "2.png";

        useEffect(() => {
            window.onbeforeunload = () => "";
        });

        return (
            <main>
                <div className="horizontal">
                    <div className="logos-left">
                        <img src={"/src/assets/o" + end} alt="Qwirkle Scoreboard" />
                        <img src={"/src/assets/b" + end} alt="Qwirkle Scoreboard" />
                        <img src={"/src/assets/g" + end} alt="Qwirkle Scoreboard" />
                    </div>
                    <div className="vertical">
                        <div className="header">
                            <img src="/src/assets/logo2_trans.png" alt="Qwirkle Scoreboard" />
                            <h1>Scoreboard</h1>
                        </div>
                        <div className="test">
                            <div className="left">
                                <Component1 {...props}/>
                            </div>
                            <div className="right">
                                <Component2 {...props}/>
                            </div>
                        </div>
                    </div>
                    <div className="logos-right">
                        <img src={"/src/assets/p" + end} alt="Qwirkle Scoreboard" />
                        <img src={"/src/assets/y" + end} alt="Qwirkle Scoreboard" />
                        <img src={"/src/assets/r" + end} alt="Qwirkle Scoreboard" />
                    </div>
                </div>
            </main>
        );
    }

  return WithRoot;
}