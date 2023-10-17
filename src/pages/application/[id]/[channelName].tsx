import { Layout } from "@/layouts/Layout";
import { BroadcastForm } from "@/modules/channels/broadcast-form";
import { trpc } from "@/utils/api";
import { success } from "@/utils/toast";
import Head from "next/head";
import { useRouter } from "next/router";

const ChannelPage = () => {
  const router = useRouter();
  const applicationId = router.query.id as string;
  const channelName = router.query.channelName as string;
  const appQuery = trpc.apps.fetch.useQuery(applicationId, { enabled: !!applicationId });
  const query = trpc.channels.fetch.useQuery({
    appId: applicationId,
    appKey: appQuery.data?.key!,
    appSecret: appQuery.data?.secret!,
    channelName
  }, { enabled: !!applicationId && !!channelName && !!appQuery.data?.key });
  const broadcast = trpc.channels.broadcast.useMutation({
    onSettled: () => {
      success('Event broadcasted');
    }
  })
  const pageTitle = `${appQuery.data?.name || ''} Application - ${channelName || ''} | Realtime Manager`;

  return (
    <Layout>
      <Head>
        <title>{pageTitle}</title>
      </Head>
      <h1 className="mt-10 text-lg font-medium">{appQuery.data?.name} Application / {channelName} Channel</h1>
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 mt-2 lg:col-span-8">
          Application Details
        </div>
        <div className="col-span-12 mt-2 sm:col-span-6 lg:col-span-4">
          Broadcast
          <BroadcastForm onSubmit={(values) => {
            broadcast.mutateAsync({
              applicationId,
              channelName,
              eventName: values.eventName,
              eventData: values.eventData,
            })
          }} />
        </div>
      </div>
    </Layout>
  )
}

export default ChannelPage;