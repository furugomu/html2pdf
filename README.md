# HTML を PDF にする API

`/` に `text/html` を `POST` すると `application/pdf` を返します。

つまりこうだ。

```console
$ curl -H 'content-type: text/html' --data-raw '<h1>hello</h1>' http://example.com -o hello.pdf
```

## めも

```
docker build -t html2pdf .
```

```
docker run --rm --expose 8080 -p 9999:8080 --cap-add=SYS_ADMIN html2pdf
# または
docker run --rm --expose 8080 -p 9999:8080 -e NO_SANDBOX=1 html2pdf
```
