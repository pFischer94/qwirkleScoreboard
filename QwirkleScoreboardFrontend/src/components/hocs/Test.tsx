import "./test.css"

export function withSplit<P extends JSX.IntrinsicAttributes>(
  Component1: React.ComponentType<P>,
  Component2: React.ComponentType<P>,
) {
    function WithRoot(props: P) {
        return (
            <main>
                <div className="horizontal">
                    <div className="logos-left">
                        <img src="/src/assets/o.png" alt="Qwirkle Scoreboard" />
                        <img src="/src/assets/b.png" alt="Qwirkle Scoreboard" />
                        <img src="/src/assets/g.png" alt="Qwirkle Scoreboard" />
                    </div>
                    <div className="vertical">
                        {/* <h1>Qwirkle Scoreboard</h1> */}
                        <img src="/src/assets/logo2_trans.png" alt="Qwirkle Scoreboard" />
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
                        <img src="/src/assets/v.png" alt="Qwirkle Scoreboard" />
                        <img src="/src/assets/y.png" alt="Qwirkle Scoreboard" />
                        <img src="/src/assets/r.png" alt="Qwirkle Scoreboard" />
                    </div>
                </div>
            </main>
        );
    }

  return WithRoot;
}