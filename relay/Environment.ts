import {
  Store,
  RecordSource,
  Environment,
  Network,
  Observable,
} from "relay-runtime";
import type { FetchFunction, IEnvironment } from "relay-runtime";

const fetchFn: FetchFunction = (params, variables) => {
  const response = fetch("https://job-fusion.hasura.app/v1beta1/relay", {
    method: "POST",
    headers: {
      Accept: 'application/json',
      "Content-Type": "application/json",  
      "x-hasura-admin-secret": "tmok8u8pioilw7HVmGV7UxsCh2PdwORkhJ0UwMcU60drIWEmV77ejvkBGTQAK7ln"
    },
    body: JSON.stringify({
      query: params.text,
      variables,
    }),
  });

  // console.log('Method called to fetch data from the environment')

  return Observable.from(response.then((data) => data.json()));
};

function createEnvironment(): IEnvironment {
  const network = Network.create(fetchFn);
  const store = new Store(new RecordSource());
  return new Environment({ store, network });
}
const environment = createEnvironment();

export { environment };