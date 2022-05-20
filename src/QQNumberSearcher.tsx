import { useCallback, useState } from "react";
import { httpGetRequest } from "./lib/request";
import "./QQNumberSearcher.css";
/**
 * QQ号码查询组件
 * @returns {JSX.Element}
 */
function QQNumberSearch(): JSX.Element {
  const [qq, setQQ] = useState("");
  const [data, setData] = useState<RawQQ | null>();
  const [hasError, setHasError] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>): void {
    const { value } = event.target;
    if (value && !value.match(/^\+?[1-9][0-9]*$/)) {
      return event.stopPropagation();
    }
    setQQ(value);
    if (!value) {
      setData(null);
    }
  }

  function handleSubmit(event: React.KeyboardEvent<HTMLInputElement>) {
    const { key } = event;
    if (key === "Enter") {
      fetch();
    }
  }

  const fetch = useCallback(async () => {
    setLoading(true);
    const { data, status } = await httpGetRequest(
      `https://api.uomg.com/api/qq.info?qq=${qq}`
    );
    if (status === 200) {
      setHasError(false);
      setData(data);
    } else {
      setHasError(true);
      setData(null);
    }
    setLoading(false);
  }, [qq]);

  return (
    <div className="qq">
      <div className="qq__title">QQ号查询</div>
      <div className="qq__search">
        <div className="qq__label">QQ</div>
        <input
          data-testid="qq"
          className="qq__input"
          autoFocus
          onChange={handleChange}
          value={qq}
          onKeyDown={handleSubmit}
        />
      </div>
      {loading && (
        <div className="qq__loading" data-testid="loading">
          努力加载中...
        </div>
      )}
      {!loading && hasError && (
        <div className="qq__error">网络请求错误，请稍后再试</div>
      )}
      {data && !loading && (
        <div className="qq__info" data-testid="qqDetail">
          <img className="qq__avatar" src={data.qlogo} alt="头像" />
          <div className="qq__detail">
            <div className="qq__nick">{data.name}</div>
            <div className="qq_number">{data.qq}</div>
          </div>
        </div>
      )}
    </div>
  );
}

export default QQNumberSearch;
