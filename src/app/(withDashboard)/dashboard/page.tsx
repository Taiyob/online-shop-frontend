import ContentLayout from "@/components/shared/ContentLayout";

const DashboardPage = async () => {
  return (
    <div>
      <ContentLayout>
        <h1 className="text-xl font-semibold">Welcome to the dashboard</h1>
      </ContentLayout>
    </div>
  );
};

export default DashboardPage;

/*

 // <div>
    //   <h1>Dashboaed</h1>

    //   {session?.user && (
    //     <div>
    //       <h1 className="text-4xl text-center mt-10">
    //         Welcome {session?.user?.name}
    //       </h1>
    //       <h1 className="text-4xl text-center mt-10">
    //         Logged in user email: {session?.user?.email}
    //       </h1>
    //       <Image
    //         src={
    //           session?.user?.image ||
    //           "https:cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png"
    //         }
    //         alt="user_image"
    //         width={100}
    //         height={100}
    //         className="mx-auto rounded-full mt-5"
    //       />
    //     </div>
    //   )}
    // </div>

*/
