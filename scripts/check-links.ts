import sources from '../data/sources.json';
async function main() {
  const failures: string[] = [];
  const inconclusive: string[] = [];
  let reachable = 0;
  for (const source of sources) {
    try {
      let response = await fetch(source.url, {
        method: 'HEAD',
        redirect: 'follow',
        headers: {
          'user-agent': 'DigitalCreditFieldGuide/1.0 research link check',
        },
      });
      if (response.status === 403 || response.status === 405) {
        response = await fetch(source.url, {
          method: 'GET',
          redirect: 'follow',
          headers: {
            range: 'bytes=0-1023',
            'user-agent': 'DigitalCreditFieldGuide/1.0 research link check',
          },
        });
      }
      if (response.ok || response.status === 206) reachable += 1;
      else if (response.status === 403 || response.status === 429)
        inconclusive.push(`${source.id}: HTTP ${response.status}`);
      else failures.push(`${source.id}: HTTP ${response.status}`);
    } catch (error) {
      failures.push(`${source.id}: ${String(error)}`);
    }
  }
  if (failures.length) {
    console.error(failures.join('\n'));
    process.exit(1);
  }
  console.log(
    `Link check completed: ${reachable} reachable, ${inconclusive.length} inconclusive, ${failures.length} broken.`,
  );
  if (inconclusive.length)
    console.warn(`Bot/rate-limit review required:\n${inconclusive.join('\n')}`);
}
void main();
