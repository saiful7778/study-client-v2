import bannerImg from "@/assets/img/undraw_educator_re_ju47.svg";
import Button from "@/components/ui/button";
import useNavigatePage from "@/hooks/useNavigatePage";

const Banner = () => {
  const navigate = useNavigatePage();

  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-between gap-4 lg:flex-row">
      <div className="w-full space-y-6 max-lg:text-center lg:w-1/2">
        <p className="mb-1 font-medium uppercase tracking-[8px]">
          Welcome to study!
        </p>
        <h3 className="text-5xl font-bold lg:text-7xl">
          Your <span className="text-blue-600">Ultimate</span>
          <br />
          Study Hub<span className="text-red-500">!</span>
        </h3>
        <p className="my-3 max-w-lg text-sm max-lg:mx-auto">
          Unlock the power of collaborative learning! Join 'study' and connect
          with students to study smarter, work on assignments, and excel
          together.
        </p>
        <div className="flex items-center gap-2">
          <Button onClick={() => navigate("/authentication/register")}>
            Register now
          </Button>
          <Button variant="outline" onClick={() => navigate("/assignments")}>
            Take an assignment
          </Button>
        </div>
      </div>
      <div className="flex-1">
        <figure className="ml-auto max-w-[550px]">
          <img src={bannerImg} alt="banner image" />
        </figure>
      </div>
    </div>
  );
};

export default Banner;
