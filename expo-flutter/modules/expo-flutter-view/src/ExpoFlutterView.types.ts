export interface WebConfig {
  flutterApp: any;
}

export interface FlutterViewProps {
  webConfig: WebConfig;

  onClicksChange?: (clicks: number) => void;
  onScreenChange?: (screen: string) => void;
  onTextChange?: (text: string) => void;

  text: string;
  screen: string;
  clicks: number;
  theme: 'dark' | 'light';
}
