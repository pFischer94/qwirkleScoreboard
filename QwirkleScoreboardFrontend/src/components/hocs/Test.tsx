import "./test.css"

export function withSplit<P extends JSX.IntrinsicAttributes>(
  Component1: React.ComponentType<P>,
  Component2: React.ComponentType<P>,
) {
    function WithRoot(props: P) {
        // useEffect(() => {
        //     window.addEventListener("beforeunload", e => e.preventDefault());

        //     return () => {
        //         window.removeEventListener("beforeunload", e => e.preventDefault());
        //     };
        // })

        return (
            <main>
                <h1>Qwirkle Scoreboard</h1>
                <div className="test">
                    <div className="left">
                        <Component1 {...props}/>
                    </div>
                    <div className="right">
                        <Component2 {...props}/>
                    </div>
                </div>
            </main>
        );
    }

  return WithRoot;
}