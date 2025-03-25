import { Button, Result } from "antd";

type ErrorType = {
  status: number;
};

export default function Error({ status }: ErrorType) {
  const title = {
    503: "503: Service Unavailable",
    500: "500: Server Error",
    404: "404: Page Not Found",
    403: "403: Forbidden",
  }[status];

  const description = {
    503: "Sorry, we are doing some maintenance. Please check back soon.",
    500: "Whoops, something went wrong on our servers.",
    404: "Sorry, the page you are looking for could not be found.",
    403: "Sorry, you are forbidden from accessing this page.",
  }[status];

  return (
    <div className="flex min-h-dvh items-center justify-center">
      <Result
        status={status === 403 ? 403 : status === 404 ? 404 : 500}
        title={title}
        subTitle={description}
        extra={
          <a href="/">
            <Button type="primary">Back to home</Button>
          </a>
        }
      />
    </div>
  );
}
