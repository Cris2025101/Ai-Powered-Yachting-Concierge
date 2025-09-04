## YachtSys Widget Integration

- The yacht search on `/yacht-results` uses the YachtSys widget.
- When you receive your YachtSys credentials, update `config/yachtsys.ts` with the real `channelCode` and `baseUrl`.
- The widget will automatically load and replace the placeholder.
- For custom styling or user experience, edit `app/yacht-results/page.tsx`.
- The page includes a placeholder and navigation options for users until the widget is live. 