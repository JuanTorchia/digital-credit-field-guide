import sources from '../data/sources.json';
async function main() {
  const failures: string[] = [];
  for (const source of sources) {
    try {
      const response = await fetch(source.url, {
        method: 'HEAD',
        redirect: 'follow',
        headers: {
          'user-agent': 'DigitalCreditFieldGuide/1.0 research link check',
        },
      });
      if (
        response.status >= 400 &&
        response.status !== 403 &&
        response.status !== 405
      )
        failures.push(`${source.id}: HTTP ${response.status}`);
    } catch (error) {
      failures.push(`${source.id}: ${String(error)}`);
    }
  }
  if (failures.length) {
    console.error(failures.join('\n'));
    process.exit(1);
  }
  console.log(`Link check passed: ${sources.length} source URLs.`);
}
void main();
