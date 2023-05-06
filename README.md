# Proxy List Builder

Proxy List Builder is a powerful tool designed to scrape proxy servers from various websites. It enables you to obtain free proxies from different sources and store them in a MongoDB database. By using this tool, you can easily access a list of functional and reliable proxies, which can be useful for different purposes.

## Supported Websites

Proxy List Builder can extract proxies from the following websites:

- https://free-proxy-list.net/
- https://www.us-proxy.org/
- https://www.sslproxies.org/
- https://www.socks-proxy.net/
- https://www.proxynova.com/proxy-server-list/

## Installation

To use Proxy List Builder, you need to clone the repository from Github:

```sh
$ git clone https://github.com/asad-haider/proxy-list-builder
```

After cloning, navigate to the project directory and install the required dependencies using the following command:

```sh
$ npm install
```

## Usage

To start using Proxy List Builder, you need to run the following command in the terminal:

```sh
$ node index.js
```

This will execute the script, and you can monitor the output to see the status of the scraping process.

## Development

If you want to contribute to the development of this tool, you can visit the project's public repository on Github. You can clone the repository, make changes, and submit a pull request.

## TODO and Roadmap

The Proxy List Builder project has some features that we plan to add in the future, including:

- Adding support for more websites.
- Checking whether a proxy is working or not.
- Check response time of proxy.

## Updates

The Proxy List Builder project has recently undergone major updates, including:

- The tool was rewritten using the Spidey framework, which is more efficient and reliable.
- We removed websites that have invalid proxies or are no longer operational.
- We made significant code changes and cleanup to improve the overall quality of the codebase.