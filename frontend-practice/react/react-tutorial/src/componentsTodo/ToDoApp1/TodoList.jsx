export default function TodoList(props) {
    return (
        <div>
            {props.inputArr.map((el) => {
                let color = el.color;
                return (
                    <p
                        key={el.text}
                        style={{
                            width: '30em',
                            height: 'auto',
                            background: color,
                            textAlign: 'center',
                            borderRadius: '1.5em',
                            margin: '0.5em',
                            padding: '0.5em',
                        }}
                    >
                        {el.text}
                    </p>
                );
            })}
        </div>
    );
}
